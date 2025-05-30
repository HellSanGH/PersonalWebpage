  fetch('counter.php')
    .then(response => response.text())
    .then(count => {
      document.getElementById('view-count').textContent = count;
    })
    .catch(err => console.error('Erreur chargement vues:', err));


function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert(`"${text}" copied to clipboard!`))
    .catch(err => console.error('Clipboard error:', err));
}
