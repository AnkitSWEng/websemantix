let currentVersion = null;

async function checkVersion() {
  try {
    const res = await fetch(`/version.json?ts=${Date.now()}`, { cache: "no-store" });
    const { version } = await res.json();

    if (currentVersion && currentVersion !== version) {
      if (confirm("A new version is available. Refresh now?")) {
        window.location.reload(true);
      }
    }
    currentVersion = version;
  } catch (err) {
    console.error("Version check failed", err);
  }
}

// Check every 90 seconds
setInterval(checkVersion, 9000000);
checkVersion();
