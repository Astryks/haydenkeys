// Uploaded songs, saved on the learner's own device (IndexedDB): the
// detected notes plus the audio file, so "My songs" can replay them later
// with the original recording. Nothing leaves the device. Keeps the 12
// most recent uploads so storage doesn't grow forever.

const DB = "hk-uploads";
const STORE = "songs";
const MAX = 12;

function db() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function tx(mode, fn) {
  const d = await db();
  return new Promise((resolve, reject) => {
    const t = d.transaction(STORE, mode);
    const out = fn(t.objectStore(STORE));
    t.oncomplete = () => resolve(out && "result" in out ? out.result : undefined);
    t.onerror = () => reject(t.error);
  });
}

async function saveUpload(file, notes) {
  try {
    const all = await listUploads();
    const extra = all.slice(MAX - 1);
    for (const old of extra) await deleteUpload(old.id);
    const item = { id: `${Date.now()}`, name: file.name.replace(/\.[^.]+$/, ""), type: file.type, date: Date.now(), notes, blob: file };
    await tx("readwrite", (s) => s.put(item));
    return item;
  } catch (e) {
    console.warn("Hayden Keys: couldn't save the upload", e);
    return null;
  }
}

async function listUploads() {
  try {
    const all = await tx("readonly", (s) => s.getAll());
    return (all || []).sort((a, b) => b.date - a.date);
  } catch (e) {
    return [];
  }
}

async function getUpload(id) {
  return tx("readonly", (s) => s.get(id));
}

async function deleteUpload(id) {
  return tx("readwrite", (s) => s.delete(id));
}

export { saveUpload, listUploads, getUpload, deleteUpload };
