/**
 * PDF Toolkit - Frontend Application
 * Handles all tool interactions and API communication
 */

const API_BASE = 'http://localhost:8000/api';

// Tool configurations
const toolConfigs = {
    'merge': {
        title: 'Merge PDF',
        description: 'Combine multiple PDF files into one document. Drag to reorder.',
        accept: '.pdf',
        multiple: true,
        minFiles: 2,
        endpoint: '/merge',
        showPreview: true,
        reorderable: true,
        options: []
    },
    'split': {
        title: 'Split PDF',
        description: 'Extract pages into separate PDF files',
        accept: '.pdf',
        multiple: false,
        endpoint: '/split',
        showPreview: true,
        showAllPages: true,
        options: [
            { name: 'pages', type: 'text', label: 'Pages to extract', placeholder: 'e.g., 1,3,5-7 or "all"', default: 'all' }
        ]
    },
    'pdf-to-word': {
        title: 'PDF to Word',
        description: 'Convert PDF to editable DOCX document',
        accept: '.pdf',
        multiple: false,
        endpoint: '/pdf-to-word',
        showPreview: true,
        options: []
    },
    'pdf-to-ppt': {
        title: 'PDF to PowerPoint',
        description: 'Convert PDF pages to presentation slides',
        accept: '.pdf',
        multiple: false,
        endpoint: '/pdf-to-ppt',
        showPreview: true,
        options: []
    },
    'pdf-to-excel': {
        title: 'PDF to Excel',
        description: 'Extract tables and data to spreadsheet',
        accept: '.pdf',
        multiple: false,
        endpoint: '/pdf-to-excel',
        showPreview: true,
        options: []
    },
    'word-to-pdf': {
        title: 'Word to PDF',
        description: 'Convert DOCX document to PDF',
        accept: '.doc,.docx',
        multiple: false,
        endpoint: '/word-to-pdf',
        options: []
    },
    'ppt-to-pdf': {
        title: 'PowerPoint to PDF',
        description: 'Convert presentation to PDF',
        accept: '.ppt,.pptx',
        multiple: false,
        endpoint: '/ppt-to-pdf',
        options: []
    },
    'excel-to-pdf': {
        title: 'Excel to PDF',
        description: 'Convert spreadsheet to PDF',
        accept: '.xls,.xlsx',
        multiple: false,
        endpoint: '/excel-to-pdf',
        options: []
    },
    'edit-pdf': {
        title: 'Edit PDF',
        description: 'Add text to your PDF document',
        accept: '.pdf',
        multiple: false,
        endpoint: '/edit-pdf',
        showPreview: true,
        options: [
            { name: 'text', type: 'text', label: 'Text to add', placeholder: 'Enter text...', default: '' },
            { name: 'text_x', type: 'number', label: 'X Position (px)', default: 100 },
            { name: 'text_y', type: 'number', label: 'Y Position (px)', default: 100 },
            { name: 'text_size', type: 'number', label: 'Font Size', default: 12 },
            { name: 'text_color', type: 'color', label: 'Text Color', default: '#000000' },
            { name: 'page_num', type: 'number', label: 'Page Number', default: 1 }
        ]
    },
    'pdf-to-jpg': {
        title: 'PDF to JPG',
        description: 'Convert PDF pages to JPG images',
        accept: '.pdf',
        multiple: false,
        endpoint: '/pdf-to-jpg',
        showPreview: true,
        showAllPages: true,
        options: [
            { name: 'dpi', type: 'number', label: 'Image Quality (DPI)', default: 200 },
            { name: 'extract_images', type: 'checkbox', label: 'Extract embedded images only', default: false }
        ]
    },
    'jpg-to-pdf': {
        title: 'JPG to PDF',
        description: 'Create PDF from images. Drag to reorder.',
        accept: '.jpg,.jpeg,.png,.gif,.webp',
        multiple: true,
        minFiles: 1,
        endpoint: '/jpg-to-pdf',
        showPreview: true,
        reorderable: true,
        options: [
            { name: 'orientation', type: 'select', label: 'Page Orientation', options: [
                { value: 'portrait', label: 'Portrait' },
                { value: 'landscape', label: 'Landscape' }
            ], default: 'portrait' },
            { name: 'margin', type: 'number', label: 'Margin (px)', default: 20 }
        ]
    },
    'watermark': {
        title: 'Add Watermark',
        description: 'Stamp text on your PDF',
        accept: '.pdf',
        multiple: false,
        endpoint: '/watermark',
        showPreview: true,
        options: [
            { name: 'text', type: 'text', label: 'Watermark Text', placeholder: 'CONFIDENTIAL', default: 'WATERMARK' },
            { name: 'font_size', type: 'number', label: 'Font Size', default: 50 },
            { name: 'opacity', type: 'range', label: 'Opacity', min: 0.1, max: 1, step: 0.1, default: 0.3 },
            { name: 'color', type: 'color', label: 'Color', default: '#888888' },
            { name: 'rotation', type: 'number', label: 'Rotation (degrees)', default: 45 },
            { name: 'position', type: 'select', label: 'Position', options: [
                { value: 'center', label: 'Center' },
                { value: 'top-left', label: 'Top Left' },
                { value: 'top-right', label: 'Top Right' },
                { value: 'bottom-left', label: 'Bottom Left' },
                { value: 'bottom-right', label: 'Bottom Right' }
            ], default: 'center' }
        ]
    },
    'rotate': {
        title: 'Rotate PDF',
        description: 'Rotate pages to any angle',
        accept: '.pdf',
        multiple: false,
        endpoint: '/rotate',
        showPreview: true,
        showAllPages: true,
        options: [
            { name: 'rotation', type: 'select', label: 'Rotation', options: [
                { value: '90', label: '90° Clockwise' },
                { value: '180', label: '180°' },
                { value: '270', label: '90° Counter-clockwise' }
            ], default: '90' },
            { name: 'pages', type: 'text', label: 'Pages to rotate', placeholder: 'e.g., 1,3,5-7 or "all"', default: 'all' }
        ]
    },
    'html-to-pdf': {
        title: 'HTML to PDF',
        description: 'Convert webpage to PDF',
        accept: null,
        multiple: false,
        endpoint: '/html-to-pdf',
        isUrl: true,
        options: [
            { name: 'url', type: 'url', label: 'Webpage URL', placeholder: 'https://example.com', required: true }
        ]
    },
    'unlock': {
        title: 'Unlock PDF',
        description: 'Remove password protection',
        accept: '.pdf',
        multiple: false,
        endpoint: '/unlock',
        showPreview: true,
        options: [
            { name: 'password', type: 'password', label: 'Current Password', placeholder: 'Enter password (if any)', default: '' }
        ]
    },
    'organize': {
        title: 'Organize PDF',
        description: 'Drag pages to reorder, click to select for deletion',
        accept: '.pdf',
        multiple: false,
        endpoint: '/organize',
        showPreview: true,
        showAllPages: true,
        pageReorderable: true,
        options: [
            { name: 'page_order', type: 'hidden', label: 'New Page Order', placeholder: 'e.g., 3,1,2,5,4', required: true },
            { name: 'delete_pages', type: 'hidden', label: 'Pages to Delete', placeholder: 'e.g., 2,4', default: '' }
        ]
    },
    'page-numbers': {
        title: 'Add Page Numbers',
        description: 'Add numbering to PDF pages',
        accept: '.pdf',
        multiple: false,
        endpoint: '/page-numbers',
        showPreview: true,
        options: [
            { name: 'position', type: 'select', label: 'Position', options: [
                { value: 'bottom-center', label: 'Bottom Center' },
                { value: 'bottom-left', label: 'Bottom Left' },
                { value: 'bottom-right', label: 'Bottom Right' },
                { value: 'top-center', label: 'Top Center' },
                { value: 'top-left', label: 'Top Left' },
                { value: 'top-right', label: 'Top Right' }
            ], default: 'bottom-center' },
            { name: 'format_str', type: 'text', label: 'Format', placeholder: 'Page {n} of {total}', default: 'Page {n} of {total}' },
            { name: 'font_size', type: 'number', label: 'Font Size', default: 12 },
            { name: 'color', type: 'color', label: 'Color', default: '#000000' },
            { name: 'start_number', type: 'number', label: 'Start Number', default: 1 },
            { name: 'skip_first', type: 'checkbox', label: 'Skip first page', default: false }
        ]
    }
};

// State
let currentTool = null;
let selectedFiles = [];
let filePreviews = {}; // Store preview data for files
let pageOrder = []; // For organize tool
let deletedPages = new Set(); // For organize tool
let draggedItem = null;

// DOM Elements
const modal = document.getElementById('modal');
const modalTitle = document.querySelector('.modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const toastContainer = document.getElementById('toast-container');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initToolCards();
    initModal();
});

// Tool card click handlers
function initToolCards() {
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', () => {
            const toolId = card.dataset.tool;
            openTool(toolId);
        });
    });
}

// Modal handlers
function initModal() {
    modalClose.addEventListener('click', closeModal);
    document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openTool(toolId) {
    currentTool = toolConfigs[toolId];
    currentTool.id = toolId;
    if (!currentTool) return;
    
    selectedFiles = [];
    filePreviews = {};
    pageOrder = [];
    deletedPages = new Set();
    
    modalTitle.textContent = currentTool.title;
    modalBody.innerHTML = generateToolUI(currentTool);
    modal.classList.add('active');
    
    initUploadZone();
    initFormHandlers();
}

function closeModal() {
    modal.classList.remove('active');
    currentTool = null;
    selectedFiles = [];
    filePreviews = {};
    pageOrder = [];
    deletedPages = new Set();
}

// Generate tool UI
function generateToolUI(config) {
    let html = `<p class="tool-description" style="color: var(--text-secondary); margin-bottom: var(--space-lg);">${config.description}</p>`;
    
    // File upload or URL input
    if (config.isUrl) {
        // URL input for HTML to PDF
        html += generateOptionsHTML(config.options);
    } else {
        html += `
            <div class="upload-zone" id="upload-zone">
                <input type="file" id="file-input" accept="${config.accept}" ${config.multiple ? 'multiple' : ''}>
                <svg class="upload-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 32V8m0 0l-8 8m8-8l8 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 28v8a4 4 0 004 4h24a4 4 0 004-4v-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
                <p class="upload-text">Drop files here or click to browse</p>
                <p class="upload-hint">Accepts ${config.accept || 'any files'}${config.multiple ? ' (multiple files)' : ''}</p>
            </div>
            <div class="preview-container" id="preview-container" style="display: none;">
                <div class="preview-header">
                    <h4>Files Preview</h4>
                    ${config.reorderable ? '<span class="preview-hint">Drag to reorder</span>' : ''}
                </div>
                <div class="preview-grid ${config.reorderable ? 'reorderable' : ''}" id="preview-grid"></div>
            </div>
            <div class="page-preview-container" id="page-preview-container" style="display: none;">
                <div class="preview-header">
                    <h4>Pages</h4>
                    ${config.pageReorderable ? '<span class="preview-hint">Drag to reorder • Click to select/delete</span>' : ''}
                </div>
                <div class="page-preview-grid ${config.pageReorderable ? 'reorderable' : ''}" id="page-preview-grid"></div>
            </div>
        `;
        
        // Options (filter out hidden ones for organize)
        const visibleOptions = config.options.filter(opt => opt.type !== 'hidden');
        if (visibleOptions.length > 0) {
            html += `<div class="options-section" style="margin-top: var(--space-lg);">
                <h4 style="margin-bottom: var(--space-md); font-weight: 600;">Options</h4>
                ${generateOptionsHTML(visibleOptions)}
            </div>`;
        }
    }
    
    // Submit button
    html += `
        <div style="margin-top: var(--space-xl);">
            <button class="btn btn-primary btn-block" id="process-btn" disabled>
                <span class="btn-text">Process</span>
                <div class="spinner" style="display: none;"></div>
            </button>
        </div>
        <div class="progress-container" id="progress-container" style="display: none;">
            <div class="progress-bar">
                <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
            </div>
            <p class="progress-text" id="progress-text">Processing...</p>
        </div>
    `;
    
    return html;
}

function generateOptionsHTML(options) {
    return options.map(opt => {
        let input = '';
        
        switch(opt.type) {
            case 'text':
            case 'url':
            case 'password':
            case 'number':
                input = `<input type="${opt.type}" class="form-input" name="${opt.name}" 
                    placeholder="${opt.placeholder || ''}" 
                    value="${opt.default || ''}"
                    ${opt.required ? 'required' : ''}>`;
                break;
            case 'color':
                input = `<input type="color" class="form-input" name="${opt.name}" value="${opt.default || '#000000'}" style="height: 44px; padding: 4px;">`;
                break;
            case 'range':
                input = `<div style="display: flex; align-items: center; gap: var(--space-md);">
                    <input type="range" name="${opt.name}" min="${opt.min}" max="${opt.max}" step="${opt.step}" value="${opt.default}" style="flex: 1;">
                    <span class="range-value" style="min-width: 40px;">${opt.default}</span>
                </div>`;
                break;
            case 'select':
                input = `<select class="form-select" name="${opt.name}">
                    ${opt.options.map(o => `<option value="${o.value}" ${o.value === opt.default ? 'selected' : ''}>${o.label}</option>`).join('')}
                </select>`;
                break;
            case 'checkbox':
                input = `<label class="form-checkbox">
                    <input type="checkbox" name="${opt.name}" ${opt.default ? 'checked' : ''}>
                    <span>${opt.label}</span>
                </label>`;
                return `<div class="form-group">${input}</div>`;
            case 'hidden':
                return `<input type="hidden" name="${opt.name}" value="${opt.default || ''}">`;
        }
        
        return `<div class="form-group">
            <label class="form-label">${opt.label}</label>
            ${input}
        </div>`;
    }).join('');
}

// Upload zone handlers
function initUploadZone() {
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('file-input');
    
    if (!uploadZone || !fileInput) return;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
        uploadZone.addEventListener(event, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });
    
    ['dragenter', 'dragover'].forEach(event => {
        uploadZone.addEventListener(event, () => uploadZone.classList.add('dragover'));
    });
    
    ['dragleave', 'drop'].forEach(event => {
        uploadZone.addEventListener(event, () => uploadZone.classList.remove('dragover'));
    });
    
    uploadZone.addEventListener('drop', (e) => {
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    });
}

async function handleFiles(files) {
    if (!currentTool.multiple) {
        selectedFiles = files.slice(0, 1);
    } else {
        selectedFiles = [...selectedFiles, ...files];
    }
    
    // Generate previews if enabled
    if (currentTool.showPreview) {
        await generatePreviews();
    }
    
    updatePreviewGrid();
    updateProcessButton();
}

async function generatePreviews() {
    const previewContainer = document.getElementById('preview-container');
    if (previewContainer) {
        previewContainer.style.display = 'block';
    }
    
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileId = `${file.name}-${file.size}-${file.lastModified}`;
        
        if (filePreviews[fileId]) continue; // Already have preview
        
        // Set loading state
        filePreviews[fileId] = { loading: true };
        updatePreviewGrid();
        
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('width', '150');
            
            const response = await fetch(`${API_BASE}/preview`, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const data = await response.json();
                filePreviews[fileId] = {
                    loading: false,
                    thumbnail: data.thumbnail,
                    pages: data.pages
                };
            } else {
                filePreviews[fileId] = { loading: false, error: true };
            }
        } catch (error) {
            console.error('Preview error:', error);
            filePreviews[fileId] = { loading: false, error: true };
        }
        
        updatePreviewGrid();
    }
    
    // If this tool shows all pages and we have exactly one PDF
    if (currentTool.showAllPages && selectedFiles.length === 1) {
        await generateAllPagePreviews(selectedFiles[0]);
    }
}

async function generateAllPagePreviews(file) {
    const pageContainer = document.getElementById('page-preview-container');
    const pageGrid = document.getElementById('page-preview-grid');
    
    if (!pageContainer || !pageGrid) return;
    
    pageContainer.style.display = 'block';
    pageGrid.innerHTML = '<div class="loading-pages">Loading pages...</div>';
    
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('width', '120');
        
        const response = await fetch(`${API_BASE}/preview-all-pages`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            pageOrder = data.thumbnails.map(t => t.page);
            deletedPages = new Set();
            renderPagePreviews(data.thumbnails);
        } else {
            pageGrid.innerHTML = '<div class="error">Failed to load page previews</div>';
        }
    } catch (error) {
        console.error('Page preview error:', error);
        pageGrid.innerHTML = '<div class="error">Failed to load page previews</div>';
    }
}

function renderPagePreviews(thumbnails) {
    const pageGrid = document.getElementById('page-preview-grid');
    if (!pageGrid) return;
    
    pageGrid.innerHTML = pageOrder.map((pageNum, index) => {
        const thumb = thumbnails.find(t => t.page === pageNum);
        const isDeleted = deletedPages.has(pageNum);
        
        return `
            <div class="page-preview-card ${isDeleted ? 'deleted' : ''} ${currentTool.pageReorderable ? 'draggable' : ''}" 
                 data-page="${pageNum}" 
                 data-index="${index}"
                 draggable="${currentTool.pageReorderable}"
                 onclick="togglePageDelete(${pageNum})">
                <div class="page-thumbnail">
                    <img src="${thumb.thumbnail}" alt="Page ${pageNum}">
                    ${isDeleted ? '<div class="delete-overlay"><span>✕</span></div>' : ''}
                </div>
                <div class="page-number">Page ${pageNum}</div>
                ${currentTool.pageReorderable ? '<div class="drag-handle">⋮⋮</div>' : ''}
            </div>
        `;
    }).join('');
    
    // Initialize drag handlers for pages
    if (currentTool.pageReorderable) {
        initPageDragHandlers();
    }
    
    // Update hidden inputs for organize tool
    updateOrganizeInputs();
}

function togglePageDelete(pageNum) {
    if (!currentTool.pageReorderable) return;
    
    if (deletedPages.has(pageNum)) {
        deletedPages.delete(pageNum);
    } else {
        deletedPages.add(pageNum);
    }
    
    // Re-render with current thumbnails
    const pageGrid = document.getElementById('page-preview-grid');
    const cards = pageGrid.querySelectorAll('.page-preview-card');
    
    cards.forEach(card => {
        const pNum = parseInt(card.dataset.page);
        if (deletedPages.has(pNum)) {
            card.classList.add('deleted');
            card.querySelector('.page-thumbnail').innerHTML = 
                card.querySelector('.page-thumbnail img').outerHTML + 
                '<div class="delete-overlay"><span>✕</span></div>';
        } else {
            card.classList.remove('deleted');
            const overlay = card.querySelector('.delete-overlay');
            if (overlay) overlay.remove();
        }
    });
    
    updateOrganizeInputs();
}

function updateOrganizeInputs() {
    const pageOrderInput = document.querySelector('input[name="page_order"]');
    const deletePagesInput = document.querySelector('input[name="delete_pages"]');
    
    if (pageOrderInput) {
        pageOrderInput.value = pageOrder.join(',');
    }
    if (deletePagesInput) {
        deletePagesInput.value = Array.from(deletedPages).join(',');
    }
}

function updatePreviewGrid() {
    const previewGrid = document.getElementById('preview-grid');
    const previewContainer = document.getElementById('preview-container');
    
    if (!previewGrid) return;
    
    if (selectedFiles.length === 0) {
        previewContainer.style.display = 'none';
        return;
    }
    
    previewContainer.style.display = 'block';
    
    previewGrid.innerHTML = selectedFiles.map((file, index) => {
        const fileId = `${file.name}-${file.size}-${file.lastModified}`;
        const preview = filePreviews[fileId] || {};
        
        let thumbnailHtml = '';
        if (preview.loading) {
            thumbnailHtml = '<div class="preview-loading"><div class="mini-spinner"></div></div>';
        } else if (preview.thumbnail) {
            thumbnailHtml = `<img src="${preview.thumbnail}" alt="${file.name}">`;
        } else if (preview.error) {
            thumbnailHtml = '<div class="preview-error">⚠️</div>';
        } else {
            thumbnailHtml = `<div class="preview-icon">
                <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" stroke-width="2"/>
                    <path d="M14 2v6h6" stroke="currentColor" stroke-width="2"/>
                </svg>
            </div>`;
        }
        
        return `
            <div class="preview-card ${currentTool.reorderable ? 'draggable' : ''}" 
                 data-index="${index}" 
                 draggable="${currentTool.reorderable}">
                <div class="preview-thumbnail">
                    ${thumbnailHtml}
                </div>
                <div class="preview-info">
                    <div class="preview-name" title="${file.name}">${truncateFilename(file.name, 20)}</div>
                    <div class="preview-meta">
                        ${formatFileSize(file.size)}
                        ${preview.pages ? ` • ${preview.pages} page${preview.pages > 1 ? 's' : ''}` : ''}
                    </div>
                </div>
                <button class="preview-remove" onclick="event.stopPropagation(); removeFile(${index})">
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
                ${currentTool.reorderable ? '<div class="drag-handle">⋮⋮</div>' : ''}
            </div>
        `;
    }).join('');
    
    // Initialize drag handlers
    if (currentTool.reorderable) {
        initDragHandlers();
    }
}

function truncateFilename(name, maxLength) {
    if (name.length <= maxLength) return name;
    const ext = name.split('.').pop();
    const base = name.substring(0, name.length - ext.length - 1);
    const truncated = base.substring(0, maxLength - ext.length - 4) + '...';
    return `${truncated}.${ext}`;
}

// Drag and drop reordering for files
function initDragHandlers() {
    const previewGrid = document.getElementById('preview-grid');
    const cards = previewGrid.querySelectorAll('.preview-card');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('drop', handleDrop);
        card.addEventListener('dragenter', handleDragEnter);
        card.addEventListener('dragleave', handleDragLeave);
    });
}

function initPageDragHandlers() {
    const pageGrid = document.getElementById('page-preview-grid');
    const cards = pageGrid.querySelectorAll('.page-preview-card');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', handlePageDragStart);
        card.addEventListener('dragend', handlePageDragEnd);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('drop', handlePageDrop);
        card.addEventListener('dragenter', handleDragEnter);
        card.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.index);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.preview-card').forEach(card => {
        card.classList.remove('drag-over');
    });
    draggedItem = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    if (this !== draggedItem) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (draggedItem === this) return;
    
    const fromIndex = parseInt(draggedItem.dataset.index);
    const toIndex = parseInt(this.dataset.index);
    
    // Reorder the files array
    const [movedFile] = selectedFiles.splice(fromIndex, 1);
    selectedFiles.splice(toIndex, 0, movedFile);
    
    // Update the preview grid
    updatePreviewGrid();
}

function handlePageDragStart(e) {
    draggedItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.index);
    e.stopPropagation(); // Prevent triggering click
}

function handlePageDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.page-preview-card').forEach(card => {
        card.classList.remove('drag-over');
    });
    draggedItem = null;
}

function handlePageDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove('drag-over');
    
    if (draggedItem === this) return;
    
    const fromIndex = parseInt(draggedItem.dataset.index);
    const toIndex = parseInt(this.dataset.index);
    
    // Reorder the page order array
    const [movedPage] = pageOrder.splice(fromIndex, 1);
    pageOrder.splice(toIndex, 0, movedPage);
    
    // Re-fetch thumbnails data and re-render
    const pageGrid = document.getElementById('page-preview-grid');
    const existingCards = pageGrid.querySelectorAll('.page-preview-card');
    const thumbnails = [];
    
    existingCards.forEach(card => {
        const pageNum = parseInt(card.dataset.page);
        const img = card.querySelector('img');
        thumbnails.push({
            page: pageNum,
            thumbnail: img ? img.src : ''
        });
    });
    
    renderPagePreviews(thumbnails);
}

function removeFile(index) {
    const file = selectedFiles[index];
    const fileId = `${file.name}-${file.size}-${file.lastModified}`;
    delete filePreviews[fileId];
    
    selectedFiles.splice(index, 1);
    updatePreviewGrid();
    updateProcessButton();
    
    // Hide page previews if no files left
    if (selectedFiles.length === 0) {
        const pageContainer = document.getElementById('page-preview-container');
        if (pageContainer) pageContainer.style.display = 'none';
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Form handlers
function initFormHandlers() {
    const processBtn = document.getElementById('process-btn');
    
    // Range value display
    document.querySelectorAll('input[type="range"]').forEach(range => {
        range.addEventListener('input', (e) => {
            e.target.parentElement.querySelector('.range-value').textContent = e.target.value;
        });
    });
    
    // URL input validation for HTML to PDF
    if (currentTool.isUrl) {
        const urlInput = document.querySelector('input[name="url"]');
        if (urlInput) {
            urlInput.addEventListener('input', updateProcessButton);
        }
    }
    
    processBtn.addEventListener('click', processFiles);
}

function updateProcessButton() {
    const processBtn = document.getElementById('process-btn');
    if (!processBtn) return;
    
    let isValid = false;
    
    if (currentTool.isUrl) {
        const urlInput = document.querySelector('input[name="url"]');
        isValid = urlInput && urlInput.value.trim().length > 0;
    } else {
        const minFiles = currentTool.minFiles || 1;
        isValid = selectedFiles.length >= minFiles;
    }
    
    processBtn.disabled = !isValid;
}

// Process files
async function processFiles() {
    const processBtn = document.getElementById('process-btn');
    const btnText = processBtn.querySelector('.btn-text');
    const spinner = processBtn.querySelector('.spinner');
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    // Show loading state
    processBtn.disabled = true;
    btnText.textContent = 'Processing...';
    spinner.style.display = 'block';
    progressContainer.style.display = 'block';
    progressFill.style.width = '0%';
    
    try {
        // Build form data
        const formData = new FormData();
        
        // Add files in current order
        if (!currentTool.isUrl) {
            if (currentTool.multiple) {
                selectedFiles.forEach(file => formData.append('files', file));
            } else {
                formData.append('file', selectedFiles[0]);
            }
        }
        
        // Add options
        currentTool.options.forEach(opt => {
            const input = document.querySelector(`[name="${opt.name}"]`);
            if (input) {
                if (opt.type === 'checkbox') {
                    formData.append(opt.name, input.checked);
                } else {
                    formData.append(opt.name, input.value);
                }
            }
        });
        
        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress = Math.min(progress + Math.random() * 15, 90);
            progressFill.style.width = `${progress}%`;
        }, 200);
        
        // Make request
        const response = await fetch(`${API_BASE}${currentTool.endpoint}`, {
            method: 'POST',
            body: formData
        });
        
        clearInterval(progressInterval);
        progressFill.style.width = '100%';
        progressText.textContent = 'Complete!';
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Processing failed');
        }
        
        // Download result
        const blob = await response.blob();
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'output';
        
        if (contentDisposition) {
            const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (match) {
                filename = match[1].replace(/['"]/g, '');
            }
        }
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        
        showToast('success', 'File processed successfully!');
        
        // Reset after delay
        setTimeout(() => {
            closeModal();
        }, 1500);
        
    } catch (error) {
        console.error('Processing error:', error);
        showToast('error', error.message || 'An error occurred');
        
        // Reset button
        btnText.textContent = 'Process';
        spinner.style.display = 'none';
        processBtn.disabled = false;
        progressContainer.style.display = 'none';
    }
}

// Toast notifications
function showToast(type, message) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' 
        ? '<svg class="toast-icon" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : '<svg class="toast-icon" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    
    toast.innerHTML = `${icon}<span class="toast-message">${message}</span>`;
    toastContainer.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.tool-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Make functions globally accessible
window.removeFile = removeFile;
window.togglePageDelete = togglePageDelete;
