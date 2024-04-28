const openPlaylistDelay = 1500;
const addPlaylistDelay = 1500;
const likeTrackDelay = 500;

const playlistName = "Target";

const listItems = Array.from(
  document.querySelectorAll(
    ".sc-button-group.sc-button-group-small:first-child"
  )
);

const likeTrack = (index) => {
  const node = listItems[index];

  if (!node) {
    console.log("Finished");
    return;
  }

    const hasLikedButton = node.querySelector(
    ".sc-button-like.sc-button-selected"
  );

  if (hasLikedButton) {
    console.log("Already liked index: ", index);

    setTimeout(() => {
      likeTrack(index + 1);
    }, 0);

    return;
  }
    node.querySelector(".sc-button-like").click();
    console.log("Added index: ", index);

    setTimeout(() => {
      likeTrack(index + 1);
    }, likeTrackDelay);
}

const addTrackToPlaylist = (index) => {
  const node = listItems[index];

  if (!node) {
    console.log("Finished");
    return;
  }

  node.querySelector(".sc-button-more").click();
  document.querySelector("button.sc-button-addtoset").click();

  setTimeout(() => {
    const playlistRow = Array.from(
      document.querySelectorAll(".addToPlaylistList__item")
    ).find((node) => node.querySelector(`[title="${playlistName}"]`));
    const playListButton = playlistRow.querySelector(
      "button.addToPlaylistButton:not(.sc-button-selected)"
    );

    if (!playListButton) {
      console.log("Already added index: ", index);

      setTimeout(() => {
        addTrackToPlaylist(index + 1);
      }, 0);

      return;
    }

    playListButton.click();
    console.log("Added index: ", index);

    setTimeout(() => {
      addTrackToPlaylist(index + 1);
    }, addPlaylistDelay);
  }, openPlaylistDelay);
};

// addTrackToPlaylist(0);
likeTrack(0);
