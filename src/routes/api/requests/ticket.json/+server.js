export async function GET({ locals, url }) {
  if (url.searchParams.has("id")) {
    const id = url.searchParams.get("id");
    try {
      const record = await locals.pb.collection("requests").getOne(id, {
        expand: "author",
      });
      const recordJson = JSON.parse(JSON.stringify(record));
      const dateOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        minute: "2-digit",
        hour: "2-digit",
      };
      const createdDate = new Date(recordJson.created);
      recordJson["created"] = createdDate.toLocaleDateString(
        "de-de",
        dateOptions
      );
      const files = recordJson["files"];
      for (let file of files) {
        const url = locals.pb.getFileUrl(record, file);
        files[files.indexOf(file)] = url;
      }
      recordJson["files"] = files;

      const answers = await locals.pb.collection("answers").getFullList(200, {
        sort: "created",
        expand: "author",
        filter: "request = '" + recordJson.id + "'",
      });

      var answerJson = JSON.parse(JSON.stringify(answers));

      for (let answer of answerJson) {
        const createdDate = new Date(answer.created);
        answer["created"] = createdDate.toLocaleDateString(
          "de-de",
          dateOptions
        );
      }
      return new Response(
        JSON.stringify({
          answers: answerJson,
          ticket: recordJson,
        }),
        {
          status: 200,
          statusText: "Ticket returned",
        }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: "No ticket found with this id",
        }),
        {
          status: 400,
          statusText: "No ticket found with this id",
        }
      );
    }
  } else {
    return new Response(
      JSON.stringify({
        error: "You have to specify an id",
      }),
      {
        status: 400,
        statusText: "You have to specify an id",
      }
    );
  }
}
