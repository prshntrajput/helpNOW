"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { setCredentials } from "@/store/authSlice";
import { registerUser } from "@/api/authApi";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: async () => registerUser(form),
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      router.push("/dashboard");
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
        Register
      </Button>
    </div>
  );
}
