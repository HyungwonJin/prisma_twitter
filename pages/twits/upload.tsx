import { useForm } from "react-hook-form";
import Input from "../../components/input";
import TextArea from "../../components/textarea";
import Button from "../../components/button";
import useMutation from "../../lib/client/useMutation";
import { useEffect } from "react";
import { Twit } from "@prisma/client";

interface UploadTwitForm {
  title: string;
  description: string;
}

interface UploadTwitMutation {
  ok: boolean;
  twit: Twit;
}

export default function upload() {
  const { register, handleSubmit } = useForm<UploadTwitForm>();
  const [uploadTwit, { loading, data: twitData }] =
    useMutation<UploadTwitMutation>("/api/twits");
  const onValid = (data: UploadTwitForm) => {
    uploadTwit(data);
  };
  useEffect(() => {
    if (twitData?.ok) {
      console.log(twitData);
    }
  }, [twitData]);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("title", { required: true })}
          label="Title"
          type="text"
          name="title"
          required
        />
        <TextArea
          label="Description"
          register={register("description", { required: true })}
          name="description"
          required
        />
        <Button text={loading ? "loading" : "upload"} />
      </form>
    </div>
  );
}
