function auth(req, res, next) {
  if (!req.session?.user?.authenticated) {
    req.session.destroy();
    return res.render("home.ejs", {
      title: "Gather & Grub",
      errors: [{ message: "You are not signed in." }],
      user: {},
    });
  }
  next();
}

module.exports = auth;
