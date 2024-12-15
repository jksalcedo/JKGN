document.addEventListener('DOMContentLoaded', () => {
    const templates = document.querySelectorAll('.template-item');

    templates.forEach(template => {
        template.addEventListener('click', (e) => {
            const id = template.getAttribute('data-template-id');
            window.location.href = `/editor/${id}`;
        });
    });
});