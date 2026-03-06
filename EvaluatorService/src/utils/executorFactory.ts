import CppExecutor from "../containers/CppExecutor.js";
import JavaExecutor from "../containers/javaExecutor.js";
import PythonExecutor from "../containers/pythonExecutor.js";
import type CodeExecutorStrategy from "../types/codeExecutorStrategy.js";

export default function createExecutor(
  codeLanguage: string,
): CodeExecutorStrategy | null {
  if (codeLanguage.toLowerCase() == "python") {
    return new PythonExecutor();
  } else if (codeLanguage.toLowerCase() == "java") {
    return new JavaExecutor();
  } else if (codeLanguage.toLowerCase() == "cpp") {
    return new CppExecutor();
  } else {
    return null;
  }
}
