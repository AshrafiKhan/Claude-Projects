(function () {
  var track = document.getElementById('galleryTrack');
  if (!track) return;

  // Clone originals to create a seamless infinite loop.
  // CSS keyframe moves -50%, which works only when the track
  // contains exactly 2x the original card set.
  var originals = Array.from(track.children);
  originals.forEach(function (card) {
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  // Scale scroll duration to card count (3.75s per card gives ~30s for 8 cards)
  document.documentElement.style.setProperty(
    '--scroll-duration',
    (originals.length * 3.75) + 's'
  );
})();
