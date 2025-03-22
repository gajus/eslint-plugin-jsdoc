import makeSynchronized from 'make-synchronized';

// ESLint doesn't support async rules
export default makeSynchronized(import.meta.url, async (imprt) => {
  const {parseImports} = await import('parse-imports')
  try {
    return [...await parseImports(imprt)];
  } catch (err) {
    return false;
  }
})
