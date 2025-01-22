export class LinkComponent {
  private link: HTMLAnchorElement | null = null;
  private isEditing: boolean = false;

  create(href: string = '#', label: string = 'Click Here'): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('link-component-container');
    container.style.display = 'flex';
    container.style.gap = '8px';
    container.style.alignItems = 'center';
    container.style.padding = '8px';

    // create link element
    this.link = document.createElement('a');
    this.link.href = href;
    this.link.innerText = label;
    this.link.classList.add('link-component');
    this.link.style.textDecoration = 'none';
    this.link.style.color = 'blue';
    this.link.style.fontSize = '14px';
    this.link.style.cursor = 'pointer';

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.classList.add('edit-button');
    editButton.style.padding = '4px 8px';
    editButton.style.cursor = 'pointer';
    editButton.style.display = 'inline-flex';

    const editForm = document.createElement('div');
    editForm.classList.add('edit-form');
    editForm.style.display = 'none';
    editForm.style.flexDirection = 'column';
    editForm.style.gap = '8px';
    editForm.style.padding = '8px';

    const urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.value = href;
    urlInput.placeholder = 'Enter URL';
    urlInput.style.padding = '4px';
    urlInput.style.marginBottom = '4px';

    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.value = label;
    labelInput.placeholder = 'Enter Label';
    labelInput.style.padding = '4px';
    labelInput.style.marginBottom = '4px';

    // New checkbox for toggle
    const targetCheckbox = document.createElement('input');
    targetCheckbox.type = 'checkbox';
    targetCheckbox.style.marginBottom = '4px';
    const checkboxLabel = document.createElement('label');
    checkboxLabel.innerText = 'Open in new tab';
    checkboxLabel.style.display = 'flex';
    checkboxLabel.style.alignItems = 'center';
    checkboxLabel.appendChild(targetCheckbox);

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.style.padding = '4px 8px';
    saveButton.style.cursor = 'pointer';

    editForm.appendChild(urlInput);
    editForm.appendChild(labelInput);
    editForm.appendChild(checkboxLabel);
    editForm.appendChild(saveButton);

    editButton.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this.isEditing = true;
      if (this.link) {
        this.link.style.display = 'none';
      }
      editButton.style.display = 'none';
      editForm.style.display = 'flex';
    });

    saveButton.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this.isEditing = false;
      if (this.link) {
        this.link.href = urlInput.value;
        this.link.innerText = labelInput.value;
        this.link.style.display = 'inline';
        this.link.target = targetCheckbox.checked ? '_blank' : '_self';
      }
      editButton.style.display = 'inline-flex';
      editForm.style.display = 'none';
    });

    container.appendChild(this.link);
    container.appendChild(editButton);
    container.appendChild(editForm);

    return container;
  }

  getLinkData() {
    return {
      href: this.link?.href || '#',
      label: this.link?.innerText || 'Click Here',
    };
  }

  updateLink(href: string, label: string, target: string = '_self'): void {
    if (this.link) {
      this.link.href = href;
      this.link.innerText = label;
      this.link.target = target;
    }
  }

  isInEditMode(): boolean {
    return this.isEditing;
  }
}
