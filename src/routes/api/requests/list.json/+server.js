import ranks from "$lib/ranks.json";

export async function GET({ locals }) {
  const records = await locals.pb.collection("requests").getFullList(200, {
    sort: "finished,created",
    expand: "author",
  });

  const recordsJson = {};
  for (const record of JSON.parse(JSON.stringify(records))) {
    record["icon"] =
      ranks[
        Object.keys(ranks).find(
          (key) =>
            Object.keys(ranks)
              .map((key) => parseInt(key))
              .filter((key) => record.expand.author.points >= key)
              .pop() == key
        )
      ].picture;
    const files = record["files"];
    for (let file of files) {
      const url = locals.pb.getFileUrl(record, file);
      files[files.indexOf(file)] = url;
    }
    record["files"] = files;
    let date = new Date(record["created"]);
    const dateOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      minute: "2-digit",
      hour: "2-digit",
    };
    record["created"] = date.toLocaleDateString("de-de", dateOptions);

    const answers = await locals.pb.collection("answers").getFullList(200, {
      sort: "created",
      expand: "author",
      filter: "request = '" + record.id + "'",
    });

    var answerJson = JSON.parse(JSON.stringify(answers));

    for (let answer of answerJson) {
      answer["icon"] =
        ranks[
          Object.keys(ranks).find(
            (key) =>
              Object.keys(ranks)
                .map((key) => parseInt(key))
                .filter((key) => answer.expand.author.points >= key)
                .pop() == key
          )
        ].picture;
      const files = answer["files"];
      for (let file of files) {
        const url = locals.pb.getFileUrl(answer, file);
        files[files.indexOf(file)] = url;
      }
      answer["files"] = files;
      const createdDate = new Date(answer.created);
      answer["created"] = createdDate.toLocaleDateString("de-de", dateOptions);
    }
    record["answers"] = answerJson;
    recordsJson[record.id] = record;
  }
  return new Response(JSON.stringify(recordsJson), {
    status: 200,
    statusText: "Returned records",
  });
}
