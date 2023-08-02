import LoginForm from './LoginForm';

function DisplayImage() {
  return (
    <div className="h-full w-[65%] bg-[url('/bg.png')] bg-[length:2000px] bg-[-920px_-70px] bg-no-repeat" />
  );
}

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[rgba(27,109,236,.9)] via-[rgba(61,157,236,.8)] to-[rgba(132,121,255,.9)]">
      <div className="flex aspect-[2/1] w-[1200px] shrink-0 grow-0 items-center overflow-hidden rounded-3xl bg-white p-5">
        <DisplayImage />
        <LoginForm />
      </div>
    </div>
  );
}
