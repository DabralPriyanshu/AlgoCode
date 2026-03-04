async function pingCheck(req, res) {
  console.log("service", this.testService);
  const data = await this.testService.pingCheck();
  res.code(200).send({ data: data });
}
module.exports = { pingCheck };
