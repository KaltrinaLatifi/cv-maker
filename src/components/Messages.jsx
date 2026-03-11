import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/client"; // <-- use your configured client

const PREVIEW_LEN = 10;

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/contact"); // ✅ sends Authorization automatically
        setMessages(res.data || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const selected = useMemo(
    () => messages.find((m) => m.id === openId) || null,
    [messages, openId]
  );

  const closeModal = () => setOpenId(null);
  const openModal = (id) => setOpenId(id);

  // close on ESC
  useEffect(() => {
    if (!openId) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openId]);

  if (loading)
    return (
      <div className="text-muted" style={{ padding: 20 }}>
        Loading…
      </div>
    );

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2 className="admin-title">Contact Messages</h2>

        {messages.length === 0 ? (
          <p className="text-muted mb-0">No messages yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table admin-table align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: 90 }}>ID</th>
                  <th style={{ width: 160 }}>Name</th>
                  <th style={{ width: 260 }}>Email</th>
                  <th style={{ width: 180 }}>Subject</th>
                  <th>Message</th>
                  <th style={{ width: 200 }}>Created At</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((msg) => {
                  const text = msg.message || "";
                  const isLong = text.length > PREVIEW_LEN;
                  const preview = isLong
                    ? text.slice(0, PREVIEW_LEN).trimEnd() + "…"
                    : text;

                  return (
                    <tr key={msg.id}>
                      <td>{msg.id}</td>
                      <td>{msg.name}</td>
                      <td className="text-muted">{msg.email}</td>
                      <td>{msg.subject}</td>

                      <td style={{ maxWidth: 520 }}>
                        <span className="text-muted">{preview}</span>

                        {isLong && (
                          <button
                            type="button"
                            onClick={() => openModal(msg.id)}
                            className="btn btn-link p-0 ms-2 admin-readmore"
                          >
                            Read more
                          </button>
                        )}
                      </td>

                      <td className="text-muted admin-date">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleString()
                          : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="admin-modal-backdrop"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <div className="admin-modal-title">
                  {selected.subject || "Message"}
                </div>
                <div className="admin-modal-meta">
                  <span>{selected.name || ""}</span>
                  <span className="admin-dot">•</span>
                  <span className="text-muted">{selected.email || ""}</span>
                  <span className="admin-dot">•</span>
                  <span className="text-muted">
                    {selected.createdAt
                      ? new Date(selected.createdAt).toLocaleString()
                      : ""}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            {/* scroll ONLY here if message is long */}
            <div className="admin-modal-body">
              <p className="mb-0">{selected.message || ""}</p>
            </div>

            <div className="admin-modal-footer">
              <button type="button" className="btn btn-primary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
