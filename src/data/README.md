# Data Folder

This folder contains all the data files used to populate the portfolio website.

## Structure

- `translations/`: Contains language files for multilingual support
  - `fr.json`: French translations
  - `en.json`: English translations
- `projects.json`: Projects showcase data
- `blog.json`: Blog posts data
- `certifications.json`: Professional certifications data

## How to Update Content

To update the content of your portfolio, simply edit the corresponding JSON files. The website will automatically load the latest data when refreshed.

### Adding a New Project

To add a new project, add a new entry to `projects.json` following this format:

```json
{
  "id": "unique-project-id",
  "image": "url-to-project-image",
  "client": "Client Name",
  "date": "2023",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "link": "https://project-link.com",
  "fr": {
    "title": "French Project Title",
    "shortDescription": "Short description in French",
    "description": "Detailed description in French"
  },
  "en": {
    "title": "English Project Title",
    "shortDescription": "Short description in English",
    "description": "Detailed description in English"
  },
  "tags": ["Tag1", "Tag2"]
}
```

### Adding a New Blog Post

To add a new blog post, add a new entry to `blog.json` following this format:

```json
{
  "id": "unique-blog-id",
  "image": "url-to-blog-image",
  "date": "2023-08-15",
  "category": "Category",
  "link": "https://blog-post-link.com",
  "fr": {
    "title": "French Blog Title",
    "excerpt": "Blog excerpt in French"
  },
  "en": {
    "title": "English Blog Title",
    "excerpt": "Blog excerpt in English"
  }
}
```

### Adding a New Certification

To add a new certification, add a new entry to `certifications.json` following this format:

```json
{
  "id": "unique-cert-id",
  "logo": "url-to-certification-logo",
  "date": "2022",
  "link": "https://certification-link.com",
  "fr": {
    "title": "French Certification Title",
    "issuer": "Issuer Name in French",
    "description": "Certification description in French"
  },
  "en": {
    "title": "English Certification Title",
    "issuer": "Issuer Name in English",
    "description": "Certification description in English"
  }
}
```

### Updating Translations

To add or modify translations, edit the corresponding language file in the `translations` folder.