import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Home route
app.get("/home", (req, res) => {
  res.render("pages/home");
});

// Editor route
app.get('/editor/:id', (req, res) => {
  const templateId = req.params.id;
  console.log('templateId:', templateId);
  // Validate template ID (1-8)
  if (templateId < 1 || templateId > 8) {
    return res.redirect('/');
  }

  res.render('pages/editor', {
    templateId: templateId,
    template: `templates/template${templateId}`,
    templateStyles: `templates/template${templateId}.css`
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
