async function createSubmission(req, res) {
  console.log(req.body);
  const response = await this.submissionService.addSubmission(req.body);
  return res.code(201).send({
    message: "Created submission successfully",
    data: response,
    error: {},
    success: true,
  });
}
module.exports = { createSubmission };
