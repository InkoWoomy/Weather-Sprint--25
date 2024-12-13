### Alexander Soria
### Weather Sprint - Client '25

This is a recreation of a figma for a weather application. It'll tell the user the weather of the city they inputted into search bar, as well as the 5-day forecast for that area.

The user can favorite their searches, either through the current weather or the history section, to view these cities at any time they wish. They are also able to remove these favorites from the favorites section if they are done using them.

Figma: https://www.figma.com/design/RJAnIIRioroHMWIgqLBoyM/Weather-Sprint---Figma?t=Qs3flJnGQ5heV5Fl-1


Peer Review : Aaron Robinson
Comments : No large concerns, design is greate although I would add background-repeat: no-repeat to avoid repeating as the screen gets narrow. On the back end, I like the use of innerHTML to interchange icons and the async functions. Although, the saved list is case case sensitive, it wouldl be effective to run the string through a funtion to format each index in title case ex. 'NEW YORK' => 'New York" I used the custom function below:

function toTitleCase(s) {
  return s
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

Great Work Overall