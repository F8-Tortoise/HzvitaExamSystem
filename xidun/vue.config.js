module.exports = {
  devServer: {
    port: 8084,
    open: true,
    before(app) {
      // 试题数据请求接口
      app.get("/subject/getAllQuestions", (req, res) => {
        res.json({
          data: [
            {
              url: "http://www.hzvita.com:4567/subject/getAllQuestions"
            }
          ]
        });
        return req;
      });
    }
  }
};
