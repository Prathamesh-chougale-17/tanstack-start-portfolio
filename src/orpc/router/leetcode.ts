import { os } from '@orpc/server'
import { z } from 'zod'

const leetcodeUsernameSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
})

type LeetCodeGraphQLResponse = {
  data: {
    matchedUser: {
      username: string
      profile: {
        ranking: number
      } | null
    } | null
    userContestRanking: {
      rating: number
      globalRanking: number
      totalParticipants: number
      topPercentage: number
    } | null
  }
}

export const getLeetcodeRating = os
  .input(leetcodeUsernameSchema)
  .handler(async ({ input }) => {
    const { username } = input

    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
          }
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
          totalParticipants
          topPercentage
        }
      }
    `

    try {
      const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { username },
        }),
        // Fresh data on each request
        cache: 'no-store',
      })

      if (!res.ok) {
        throw new Error(`LeetCode API returned ${res.status}`)
      }

      const data = (await res.json()) as LeetCodeGraphQLResponse

      if (!data.data.matchedUser) {
        throw new Error('User not found or API response invalid')
      }

      return {
        success: true,
        username: data.data.matchedUser.username,
        ranking: data.data.matchedUser.profile?.ranking ?? null,
        contestRating: data.data.userContestRanking?.rating ?? null,
        globalRanking: data.data.userContestRanking?.globalRanking ?? null,
        totalParticipants:
          data.data.userContestRanking?.totalParticipants ?? null,
        topPercentage: data.data.userContestRanking?.topPercentage ?? null,
      }
    } catch (error) {
      console.error('Error fetching LeetCode data:', error)
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to fetch LeetCode rating',
      )
    }
  })
