//이메일 인증 코드 입력 페이지
'use client'
import { Button } from '@/components/ui/button';
import { API_URL } from '@/server';
import { setAuthUser } from '@/store/authSlice';
import { RootState } from '@/store/store';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Verify = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement | null[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.User);

  useEffect(() => {
    if (!user) router.push('/auth/login');
  }, [user, router]);

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      event.key === "Backspace" &&
      !inputRefs.current[index]?.value &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const optValue = otp.join('');
      const response = await axios.post(
        `${API_URL}/users/verify`,
        { otp: optValue },
        { withCredentials: true }
      );
      const verifiedUser = response.data.user;
      dispatch(setAuthUser(verifiedUser));
      toast.success("이메일 인증이 완료되었습니다.");
      router.push('/');
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/users/resend-otp`, null,
        { withCredentials: true }
      );
      toast.success("인증번호가 재전송되었습니다.");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl mb-4 font-semibold'>이메일 인증 코드를 입력해주세요.</h1>
      <div className='flex space-x-4'>
        {[1, 2, 3, 4].map((index) => {
          return (
            <input
              type='number'
              key={index}
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className='w-20 h-20 rounded-lg bg-gray-200 text-3xl font-bold text-center no-spinner'

            />
          )
        })}
      </div>

      {!loading && <div className='flex items-center space-x-4 mt-6'>
        <Button onClick={handleSubmit} variant={"default"}>제출하기</Button>
        <Button onClick={handleResendOtp} className='bg-orange-600'>인증번호 재전송</Button>
      </div>}
      {loading && <Button className='mt-6'>
        <Loader className='animate-spin' />
      </Button>}
    </div>
  )
}

export default Verify;