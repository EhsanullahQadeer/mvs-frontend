export const userTagsObj: { [key: string]: string } = {
    artist: "Artists",
    producer: "Producers",
    songwriter: "Songwriters",
    mastering_engineer: "Mastering Engineers",
    mixing_engineer: "Mixing Engineers",
    musicians: "Musicians",
};
const userTags = Object.keys(userTagsObj);
const userLabels = Object.values(userTagsObj)
export { userTags, userLabels };