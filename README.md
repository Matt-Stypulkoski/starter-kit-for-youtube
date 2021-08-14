# [Starter Kit for Youtube](https://matt-stypulkoski.github.io/starter-kit-for-youtube/)</br>
Starter Kit for Youtube is a web application created in React that utilizes the Youtube Data API to retrieve video data based on given search parameters. This web app allows for users to enter a search term and retrieve a list of the most popular videos relevant to their search term. You can filter the results by release date to provide a more accurate representation of what Youtube users are watching at any given time.

This information is great for new users starting out their channel, as they can see what the most popular types of videos are for the content they want to focus on. They can choose to copy popular channels and post during the most popular upload times, or they can find a style that has not been used yet, while avoiding all of the popular upload times to give their videos more visibility. This web app gives the user all of the information they would need to help start out their channel with as much of a head start as they can get.

## How to Use
1. Enter a search term related to the type of content you will focus on.
2. Enter a date range to the filter the videos that are returned. If you enter only a start or end date, the videos returned will have been published after or before the entered date respectively. If no dates are entered, there will be no date range restriction on the videos returned.
3. Set your Region. Only videos that are able to be viewed in that region will be returned.
4. Hit Search, and look through the results.

The app will return the 50 most relevant and most viewed videos given the parameters entered. The results will be sorted by most views, so you can see what is most popular type of video for this content right away. Clicking on a thumbnail will open the video in another tab, and clicking the channel name will bring you to that channel.

![Youtube Starter Kit Usage](https://user-images.githubusercontent.com/50181769/129456643-33d7e1a8-d147-40b5-9ce2-5d26fce01ce6.gif)


## Technologies Used
1. React
2. Youtube Data API
3. Javascript
4. Github Pages 
