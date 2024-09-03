export const userTagsObj: { [key: string]: string } = {
    songwriter: "Songwriters",
    artist: "Artists",
    mastering_engineer: "Mastering Engineers",
    mixing_engineer: "Mixing Engineers",
    musicians: "Musicians",
    producer: "Producers"
};
const userTags = Object.keys(userTagsObj);
const userLabels = Object.values(userTagsObj)
export { userTags, userLabels };