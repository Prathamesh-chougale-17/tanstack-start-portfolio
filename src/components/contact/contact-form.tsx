import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { orpc } from '@/orpc/client'
import * as m from '@/paraglide/messages'

export function ContactForm() {
  const contactMutation = useMutation({
    mutationFn: orpc.submitContact.call,
    onSuccess: (data) => {
      toast.success(data.message || m.contact_form_success())
      form.reset()
    },
    onError: (error: Error) => {
      toast.error(error.message || m.contact_form_error())
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      await contactMutation.mutateAsync(value)
    },
  })

  const isPending = contactMutation.isPending

  return (
    <Card className="animate-fade-in-right">
      <CardContent className="pt-6">
        <h2 className="mb-6 font-bold text-2xl">{m.contact_form_title()}</h2>

        <form
          className="space-y-4"
          id="contact-form-tanstack"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(2, { message: 'Name must be at least 2 characters' })
                  .safeParse(value)
                return result.success
                  ? undefined
                  : result.error.issues[0].message
              },
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0
              return (
                <div className="space-y-2">
                  <label className="font-medium text-sm" htmlFor="name">
                    {m.contact_form_name_label()}
                  </label>
                  <Input
                    aria-invalid={isInvalid}
                    className="w-full"
                    disabled={isPending}
                    id="name"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={m.contact_form_name_placeholder()}
                    value={field.state.value}
                  />
                  {isInvalid && (
                    <p className="text-destructive text-sm">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )
            }}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .email({ message: 'Please enter a valid email address' })
                  .safeParse(value)
                return result.success
                  ? undefined
                  : result.error.issues[0].message
              },
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0
              return (
                <div className="space-y-2">
                  <label className="font-medium text-sm" htmlFor="email">
                    {m.contact_form_email_label()}
                  </label>
                  <Input
                    aria-invalid={isInvalid}
                    className="w-full"
                    disabled={isPending}
                    id="email"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={m.contact_form_email_placeholder()}
                    type="email"
                    value={field.state.value}
                  />
                  {isInvalid && (
                    <p className="text-destructive text-sm">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )
            }}
          </form.Field>

          <form.Field
            name="subject"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(5, { message: 'Subject must be at least 5 characters' })
                  .safeParse(value)
                return result.success
                  ? undefined
                  : result.error.issues[0].message
              },
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0
              return (
                <div className="space-y-2">
                  <label className="font-medium text-sm" htmlFor="subject">
                    {m.contact_form_subject_label()}
                  </label>
                  <Input
                    aria-invalid={isInvalid}
                    className="w-full"
                    disabled={isPending}
                    id="subject"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={m.contact_form_subject_placeholder()}
                    value={field.state.value}
                  />
                  {isInvalid && (
                    <p className="text-destructive text-sm">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )
            }}
          </form.Field>

          <form.Field
            name="message"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(10, {
                    message: 'Message must be at least 10 characters',
                  })
                  .safeParse(value)
                return result.success
                  ? undefined
                  : result.error.issues[0].message
              },
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0
              return (
                <div className="space-y-2">
                  <label className="font-medium text-sm" htmlFor="message">
                    {m.contact_form_message_label()}
                  </label>
                  <Textarea
                    aria-invalid={isInvalid}
                    className="w-full"
                    disabled={isPending}
                    id="message"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={m.contact_form_message_placeholder()}
                    rows={4}
                    value={field.state.value}
                  />
                  {isInvalid && (
                    <p className="text-destructive text-sm">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )
            }}
          </form.Field>

          <Button
            className="w-full cursor-pointer"
            disabled={isPending}
            type="submit"
          >
            {isPending ? 'Sending...' : m.contact_form_submit()}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
