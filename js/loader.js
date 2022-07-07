class WasmLoader {
  constructor() {}

  async wasm(path) {
    console.log(`Fethcing ${path}`);

    if(!WebAssembly.instantiateStreaming) {
      return this.wasmFallback(path);
    }

    const { instance } = await WebAssembly.instantiateStreaming(fetch(path));

    return instance?.exports;
  }

  wasmFallback(path) {
    console.log(`Using fallback ${path}`);

    const response = await fetch(path);
    const bytes = await response?.arrayBuffer();
    const { instance } = WebAssembly.instantiate(bytes);

    return instance?.exports;
  }
}