import {useForm} from "react-hook-form";
import Input from "../components/input";
import Button from "../components/button";
import Link from "next/link";
import useMutation from "../lib/client/useMutation";
import {useRouter} from "next/router";
import {useEffect} from "react";
import useUser from "../lib/client/useUser";

interface EnterForm {
  userId: string;
  password: string;
}

interface MutationResult {
  ok: boolean;
}

export default function CreateAccount() {
  const {user} = useUser()
  const [create, {loading, data}] = useMutation<MutationResult>(
    "/api/users/create-account"
  );
  const {register, handleSubmit} = useForm<EnterForm>();
  const onValid = (inputData: EnterForm) => {
    create(inputData);
  };
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [router, user]);

  useEffect(() => {
    if (data?.ok) {
      router.push("/log-in");
    }
  }, [data, router]);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("userId", {required: true})}
          required
          name="userId"
          label="User Name"
          type="text"
        />
        <Input
          register={register("password", {required: true})}
          label="Password"
          type="password"
          required
          name="password"
        />
        <Button text={loading ? "Loading..." : "Create Account"}/>
      </form>
      <Link href="/log-in">
        <span>이미 회원이신가요?&rarr;</span>
      </Link>
    </div>
  );
}
