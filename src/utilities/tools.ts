interface IArtist {
  id: string;
  name: string;
  type: string;
}
export function prepareData(data: IArtist[]) {
  const unique: typeof data = data.filter(
    (item, i, self) => self.findIndex((element) => element.id === item.id) === i
  );
  unique.sort((a, b) => {
    const aName = a.name;
    const bName = b.name;
    return aName.localeCompare(bName, "en", { sensitivity: "base" });
  });
  return unique;
}
