import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

export function useRefreshIncident() {
  const queryClient = useQueryClient()
  return useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["incident"] })
    queryClient.invalidateQueries({ queryKey: ["incident-flows"] })
    queryClient.invalidateQueries({ queryKey: ["incident-alerts"] })
  }, [queryClient])
}
