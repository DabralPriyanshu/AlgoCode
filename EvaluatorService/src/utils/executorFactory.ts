import CppExecutor from "../containers/CppExecutor.js";
import JavaExecutor from "../containers/javaExecutor.js";
import PythonExecutor from "../containers/pythonExecutor.js";
import type CodeExecutorStrategy from "../types/codeExecutorStrategy.js";

export default function createExecutor(
  codeLanguage: string,
): CodeExecutorStrategy | null {
  if (codeLanguage == "PYTHON") {
    return new PythonExecutor();
  } else if (codeLanguage == "JAVA") {
    return new JavaExecutor();
  } else if (codeLanguage == "CPP") {
    return new CppExecutor();
  } else {
    return null;
  }
}
