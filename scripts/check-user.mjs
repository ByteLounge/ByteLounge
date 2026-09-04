async function checkLeetCode(user) {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum { difficulty count }
            }
          }
        }`,
        variables: { username: user }
      })
    });
    const data = await res.json();
    console.log(`LeetCode [${user}]:`, JSON.stringify(data));
  } catch (e) {
    console.log(`LeetCode error [${user}]:`, e.message);
  }
}

async function checkGitHub(user) {
  try {
    const res = await fetch(`https://api.github.com/users/${user}`);
    const data = await res.json();
    console.log(`GitHub [${user}]: repos=${data.public_repos}, followers=${data.followers}, bio=${data.bio}`);
  } catch (e) {
    console.log(`GitHub error [${user}]:`, e.message);
  }
}

async function run() {
  await checkGitHub("ByteLounge");
  await checkLeetCode("ByteLounge");
  await checkLeetCode("yashsanikop");
  await checkLeetCode("konuriyash");
  await checkLeetCode("iyashsanikop");
}
run();
