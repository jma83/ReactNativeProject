const charactersImg = require('@assets/imgs/characters.png');
const locationsImg = require('@assets/imgs/locations.jpg');
const seasonsImg = require('@assets/imgs/seasons.jpg');
import ContentType from '@application/data/ContentType';

const ContentCategoryTypes = [
  { id: ContentType.CHARACTER, name: 'Characters', image: charactersImg },
  { id: ContentType.LOCATION, name: 'Locations', image: locationsImg },
  { id: ContentType.EPISODE, name: 'Episodes', image: seasonsImg }
];
export default ContentCategoryTypes;
