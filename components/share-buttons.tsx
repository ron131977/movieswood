"use client"

import { useState } from "react"
import { FacebookIcon, TwitterIcon, LinkedinIcon, MailIcon, LinkIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

interface ShareButtonsProps {
  url: string
  title: string
  description: string
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the URL manually.",
        variant: "destructive",
      })
    }
  }

  const shareLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
      color: "bg-[#3b5998] hover:bg-[#3b5998]/90",
    },
    {
      name: "Twitter",
      icon: <TwitterIcon className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="h-5 w-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "bg-[#0077b5] hover:bg-[#0077b5]/90",
    },
    {
      name: "Email",
      icon: <MailIcon className="h-5 w-5" />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this documentary: ${title}\n\n${description}\n\n${url}`)}`,
      color: "bg-gray-600 hover:bg-gray-600/90",
    },
  ]

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium mr-2">Share:</span>
      <TooltipProvider>
        {shareLinks.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={`rounded-full w-8 h-8 p-0 text-white ${link.color}`}
                onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
                aria-label={`Share on ${link.name}`}
                // style={{ filter: "contrast(1.3) saturate(1.2) brightness(1.0) hue-rotate(0deg)" }}
              >
                {link.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on {link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full w-8 h-8 p-0"
              onClick={handleCopyLink}
              aria-label="Copy link"
            >
              {copied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <LinkIcon className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : "Copy link"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

