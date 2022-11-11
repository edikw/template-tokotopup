export default function ({
  redirect,
  app,
}) {

  const token = app.$cookies.get('_vtk_m')
  if (!token) {
    redirect('/login')
  }

}
