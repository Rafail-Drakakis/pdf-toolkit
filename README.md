# PDF Toolkit

A comprehensive PDF management system with a modern frontend and powerful Python backend. Process, convert, and manipulate PDF files with ease.

![PDF Toolkit](https://img.shields.io/badge/PDF-Toolkit-coral?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge)
![Flask](https://img.shields.io/badge/Flask-3.0-green?style=for-the-badge)

## Features

### PDF Operations
- **Merge PDF** - Combine multiple PDFs into one document
- **Split PDF** - Extract pages into separate files
- **Rotate PDF** - Rotate pages to any angle
- **Organize PDF** - Reorder, delete & add pages
- **Page Numbers** - Add numbering to PDF pages
- **Watermark** - Stamp text or images on PDF
- **Unlock PDF** - Remove password protection
- **Edit PDF** - Add text, images & annotations

### Conversions
- **PDF to Word** - Convert PDF to editable DOCX
- **PDF to PowerPoint** - Convert PDF to PPTX slides
- **PDF to Excel** - Extract tables to spreadsheets
- **PDF to JPG** - Convert pages to images
- **Word to PDF** - Convert DOCX to PDF
- **PowerPoint to PDF** - Convert PPTX to PDF
- **Excel to PDF** - Convert XLSX to PDF
- **JPG to PDF** - Create PDF from images
- **HTML to PDF** - Convert webpages to PDF

## System Requirements

### Backend Dependencies
- Python 3.9+
- LibreOffice (for Office document conversions)
- wkhtmltopdf (for HTML to PDF conversion)
- Poppler (for PDF to image conversion)

### Install System Dependencies

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install -y libreoffice wkhtmltopdf poppler-utils
```

**macOS:**
```bash
brew install libreoffice wkhtmltopdf poppler
```

**Windows:**
- Download and install [LibreOffice](https://www.libreoffice.org/download/download/)
- Download and install [wkhtmltopdf](https://wkhtmltopdf.org/downloads.html)
- Download and install [Poppler for Windows](https://github.com/oschwartz10612/poppler-windows/releases)

## Installation

### 1. Clone or navigate to the project

```bash
cd /home/rafail/Downloads/pdf-toolkit
```

### 2. Create a virtual environment (recommended)

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the backend server

```bash
cd backend
python main.py
```

Or with Flask CLI:
```bash
cd backend
flask --app main run --host 0.0.0.0 --port 8000
```

### 5. Serve the frontend

Option A - Using Python's built-in server:
```bash
cd frontend
python3 -m http.server 3001
```

Option B - Using Node.js (if available):
```bash
cd frontend
npx serve -p 3000
```

### 6. Access the application

Open your browser and navigate to:
- **Frontend:** http://localhost:3001
- **API:** http://localhost:8000/api/health

## Project Structure

```
pdf-toolkit/
├── backend/
│   └── main.py          # Flask application with all endpoints
├── frontend/
│   ├── index.html       # Main HTML file
│   ├── styles.css       # Modern dark theme styles
│   └── app.js           # Frontend JavaScript logic
├── uploads/             # Temporary upload storage
├── outputs/             # Processed file output
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/merge` | POST | Merge multiple PDFs |
| `/api/split` | POST | Split PDF into pages |
| `/api/pdf-to-word` | POST | Convert PDF to DOCX |
| `/api/pdf-to-ppt` | POST | Convert PDF to PPTX |
| `/api/pdf-to-excel` | POST | Convert PDF to XLSX |
| `/api/word-to-pdf` | POST | Convert DOCX to PDF |
| `/api/ppt-to-pdf` | POST | Convert PPTX to PDF |
| `/api/excel-to-pdf` | POST | Convert XLSX to PDF |
| `/api/edit-pdf` | POST | Add text to PDF |
| `/api/pdf-to-jpg` | POST | Convert PDF to images |
| `/api/jpg-to-pdf` | POST | Create PDF from images |
| `/api/watermark` | POST | Add watermark to PDF |
| `/api/rotate` | POST | Rotate PDF pages |
| `/api/html-to-pdf` | POST | Convert URL to PDF |
| `/api/unlock` | POST | Remove PDF password |
| `/api/organize` | POST | Reorder/delete pages |
| `/api/page-numbers` | POST | Add page numbers |
| `/api/pdf-info` | POST | Get PDF metadata |
| `/api/health` | GET | Health check |

## Usage Examples

### Merge PDFs (curl)
```bash
curl -X POST "http://localhost:8000/api/merge" \
  -F "files=@document1.pdf" \
  -F "files=@document2.pdf" \
  --output merged.pdf
```

### Convert PDF to Word
```bash
curl -X POST "http://localhost:8000/api/pdf-to-word" \
  -F "file=@document.pdf" \
  --output document.docx
```

### Add Watermark
```bash
curl -X POST "http://localhost:8000/api/watermark" \
  -F "file=@document.pdf" \
  -F "text=CONFIDENTIAL" \
  -F "opacity=0.3" \
  -F "font_size=50" \
  --output watermarked.pdf
```

## Development

### Running in development mode

Backend with auto-reload:
```bash
flask --app main run --debug --port 8000
```

Or simply:
```bash
python main.py
```

The Flask development server will auto-reload on code changes when `debug=True`.

## Troubleshooting

### "LibreOffice not installed" error
Make sure LibreOffice is installed and accessible from the command line:
```bash
libreoffice --version
```

### "wkhtmltopdf not found" error
Install wkhtmltopdf and ensure it's in your PATH:
```bash
wkhtmltopdf --version
```

### PDF to image conversion fails
Ensure Poppler is installed:
```bash
pdftoppm -v
```

### Permission errors on uploads/outputs folders
```bash
chmod 755 uploads outputs
```

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
