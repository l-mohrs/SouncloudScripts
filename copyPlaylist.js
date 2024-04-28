const openPlaylistDelay = 1500;
const addPlaylistDelay = 1500;
const likeTracksDelay = 500;
const scrollDelay = 500;

const playlistName = "Good Sets";

const listItems = Array.from(
  document.querySelectorAll(
    ".sc-button-group.sc-button-group-small:first-child"
  )
);

const scrollToBottomOfPlaylist = async (previousDocumentHeight) => {
  const documentHeight = document?.body?.scrollHeight;
  if (previousDocumentHeight >= documentHeight) {
    console.log("Scrolled to bottom");
    return;
  }
  window.scrollTo(0, document.body.scrollHeight);
  setTimeout(() => {
    return scrollToBottomOfPlaylist(documentHeight);
  }, scrollDelay);
};

const likeTracks = (index) => {
  scrollToBottomOfPlaylist(0);
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
      likeTracks(index + 1);
    }, 0);

    return;
  }
  node.querySelector(".sc-button-like").click();
  console.log("Added index: ", index);

  setTimeout(() => {
    likeTracks(index + 1);
  }, likeTracksDelay);
};

const addTracksToPlaylist = async (index) => {
  console.log({ listItems });
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
        addTracksToPlaylist(index + 1);
      }, 0);

      return;
    }

    playListButton.click();
    console.log("Added index: ", index);

    setTimeout(() => {
      addTracksToPlaylist(index + 1);
    }, addPlaylistDelay);
  }, openPlaylistDelay);
};

scrollToBottomOfPlaylist(0);
// addTracksToPlaylist(0);
// likeTracks(0);
