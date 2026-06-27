(function () {
  var track = document.getElementById('galleryTrack');
  if (!track) return;

  var originals = Array.from(track.children);
  originals.forEach(function (card) {
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  document.documentElement.style.setProperty(
    '--scroll-duration',
    (originals.length * 3.75) + 's'
  );
})();
