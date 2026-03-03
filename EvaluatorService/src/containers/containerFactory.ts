import Docker from "dockerode";

/**
 * 
 * @param imageName  it is name of the image

 * @param cmdExecutable cmd command you want to execute

  @description   this function will take image name and command to execute and create a docker container 
 */
async function createContainer(imageName: string, cmdExecutable: string[]) {
  const docker = new Docker();
  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExecutable,
    AttachStdin: true, //to enable input stream
    AttachStdout: true, //to enable output stream
    AttachStderr: true, // to enable error stream
    Tty: false,
    OpenStdin: true,
  });
  return container;
}
export default createContainer;
