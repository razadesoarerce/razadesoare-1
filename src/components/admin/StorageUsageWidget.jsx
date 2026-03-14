import { useState, useEffect, useCallback } from "react";
import {
  getStorageUsage,
  FREE_STORAGE_LIMIT_GB,
  FREE_STORAGE_LIMIT_BYTES,
} from "../../services/storageUsageService";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

function bytesToMB(bytes) {
  return bytes / (1024 * 1024);
}

const StorageUsageWidget = () => {
  const [imagesMB, setImagesMB] = useState(null);
  const [documentsMB, setDocumentsMB] = useState(null);
  const [totalBytes, setTotalBytes] = useState(null);
  const [percentageUsed, setPercentageUsed] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsage = useCallback(async () => {
    setError(null);
    try {
      const { imagesSizeBytes, documentsSizeBytes } = await getStorageUsage();
      const total = imagesSizeBytes + documentsSizeBytes;
      const pct = (total / FREE_STORAGE_LIMIT_BYTES) * 100;

      setImagesMB(bytesToMB(imagesSizeBytes));
      setDocumentsMB(bytesToMB(documentsSizeBytes));
      setTotalBytes(total);
      setPercentageUsed(pct);
    } catch (err) {
      console.error("Storage usage:", err);
      setError("Storage usage unavailable.");
      setImagesMB(null);
      setDocumentsMB(null);
      setTotalBytes(null);
      setPercentageUsed(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsage();
    const interval = setInterval(fetchUsage, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchUsage]);

  if (loading && !error) {
    return (
      <div className="storage-usage-widget" style={styles.panel}>
        <h3 style={styles.title}>Storage Usage</h3>
        <p style={styles.muted}>Se încarcă…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="storage-usage-widget" style={styles.panel}>
        <h3 style={styles.title}>Storage Usage</h3>
        <p style={styles.error}>{error}</p>
      </div>
    );
  }

  const totalMB = totalBytes != null ? bytesToMB(totalBytes) : 0;
  const pct = percentageUsed != null ? Math.min(100, Math.round(percentageUsed * 100) / 100) : 0;
  const showWarning = pct >= 80 && pct < 95;
  const showCritical = pct >= 95;

  return (
    <div className="storage-usage-widget" style={styles.panel}>
      <h3 style={styles.title}>Storage Usage</h3>

      <p style={styles.row}>
        <span style={styles.label}>Images:</span>{" "}
        <span>{imagesMB != null ? `${imagesMB.toFixed(1)} MB` : "—"}</span>
      </p>
      <p style={styles.row}>
        <span style={styles.label}>Documents:</span>{" "}
        <span>{documentsMB != null ? `${documentsMB.toFixed(1)} MB` : "—"}</span>
      </p>

      <p style={{ ...styles.row, ...styles.total }}>
        <span style={styles.label}>Total:</span>{" "}
        <span>{totalMB.toFixed(1)} MB / {FREE_STORAGE_LIMIT_GB} GB</span>
      </p>
      <p style={styles.row}>
        <span style={styles.label}>Usage:</span>{" "}
        <span>{pct.toFixed(2)} %</span>
      </p>

      <div style={styles.progressWrap}>
        <div
          className="progress-bar"
          style={{
            ...styles.progressBar,
            width: `${Math.min(100, pct)}%`,
          }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {showWarning && (
        <p style={styles.warning}>
          ⚠ Storage usage approaching free plan limit.
        </p>
      )}
      {showCritical && (
        <p style={styles.critical}>
          ❗ Storage almost full.
        </p>
      )}
    </div>
  );
};

const styles = {
  panel: {
    padding: "16px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    maxWidth: "320px",
  },
  title: {
    margin: "0 0 12px 0",
    fontSize: "1rem",
    fontWeight: 600,
  },
  row: {
    margin: "4px 0",
    fontSize: "0.9rem",
  },
  label: {
    color: "#6b7280",
  },
  total: {
    marginTop: "8px",
    fontWeight: 500,
  },
  progressWrap: {
    height: "8px",
    background: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "12px",
    marginBottom: "8px",
  },
  progressBar: {
    height: "100%",
    background: "#1e3a8a",
    borderRadius: "4px",
    transition: "width 0.2s ease",
  },
  muted: {
    color: "#9ca3af",
    fontSize: "0.9rem",
    margin: 0,
  },
  error: {
    color: "#b91c1c",
    fontSize: "0.9rem",
    margin: 0,
  },
  warning: {
    margin: "8px 0 0 0",
    fontSize: "0.85rem",
    color: "#b45309",
  },
  critical: {
    margin: "4px 0 0 0",
    fontSize: "0.85rem",
    color: "#b91c1c",
  },
};

export default StorageUsageWidget;
