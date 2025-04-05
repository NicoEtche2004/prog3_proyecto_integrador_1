
function App() {
  return (
    <>
    <switch>
        <Route path={'/'} exact={true} component={Home} />
        <Route path={'/aboutus'} component={AboutUs} />
        <Route path={'/detalle/:id'} component={Detalle} />
        <Route path={''} component={NotFound} />
    </switch>
    <p>ahora anda</p>
    </>
  );
}

export default App;

