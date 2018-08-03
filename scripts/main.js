var showList = function (image, i) {
    var thumbnail = $('<li>');
    var thumbImage = $('<img>');
    var thumbHover = $('<div>');
    var thumbCaption = $('<p>');
    var currentI = i;

    thumbnail.addClass("thumbnail");
    thumbImage.attr('src', image.url);
    thumbImage.addClass("thumb-image");
    thumbHover.addClass("thumb-hover");
    thumbCaption.text(image.caption);
    thumbCaption.addClass("thumb-hover-caption");

    thumbHover.append(thumbCaption);
    thumbnail.append(thumbImage);
    thumbnail.append(thumbHover);
    listDisplayed.append(thumbnail);

    var clickOpenModal = function() {
        modalImage.attr('src', image.url);
        modal.addClass("show-modal");
        body.addClass("stop-scrolling");
        modalTitle.text(image.caption);
        modalComments.text(image.comments);
        modalCloseButton.on('click', clickCloseModal);
        currentImageIndex = currentI;
    };

    thumbnail.on('click', clickOpenModal);
};

whichList.forEach(showList);
}

chooseList(currentList);