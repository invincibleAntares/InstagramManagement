
export async function fetchWebProfileInfo(page, username) {
  return await page.evaluate(async (u) => {
    try {
      const r = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${u}`, {
        headers: { "x-ig-app-id": "936619743392459" }
      });
      if (!r.ok) return { ok: false, status: r.status };
      return { ok: true, json: await r.json() };
    } catch (e) {
      return { ok: false, err: String(e) };
    }
  }, username);
}
