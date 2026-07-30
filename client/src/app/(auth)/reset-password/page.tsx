import { AuthCard } from '@/components/auth/AuthPrimitives'
import { ResetPasswordForm } from './ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <div className="w-full animate-fade-in-up">
      <AuthCard title="New Password" subtitle="Please enter your new password below.">
        <ResetPasswordForm />
      </AuthCard>
    </div>
  )
}
