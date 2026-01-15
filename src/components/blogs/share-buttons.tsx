import { TwitterLogo, LinkedinLogo, Link as LinkIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { Blog } from '@/types/blog'
import { Button } from '@/components/ui/button'
import * as m from '@/paraglide/messages'

type ShareButtonsProps = {
  blog: Blog
}

export function ShareButtons({ blog }: ShareButtonsProps) {
  const url = `https://prathamesh-chougale.vercel.app/blogs/${blog.slug}`
  const text = `${blog.title} - by ${blog.author}`

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank', 'width=600,height=400')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success(m.blogsPage_linkCopied())
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-lg">Share this article</h3>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={shareOnTwitter}
          size="sm"
          variant="outline"
          className="gap-2"
        >
          <TwitterLogo className="h-4 w-4" />
          Twitter
        </Button>
        <Button
          onClick={shareOnLinkedIn}
          size="sm"
          variant="outline"
          className="gap-2"
        >
          <LinkedinLogo className="h-4 w-4" />
          LinkedIn
        </Button>
        <Button
          onClick={copyLink}
          size="sm"
          variant="outline"
          className="gap-2"
        >
          <LinkIcon className="h-4 w-4" />
          Copy Link
        </Button>
      </div>
    </div>
  )
}
