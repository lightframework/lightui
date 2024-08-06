export function taskTypeLabel(type?: string): string | undefined {
  switch (type) {
    case "connectTest": {
      return "连通测试"
    }
    case "upgrade": {
      return "升级"
    }
    case "deploy": {
      return "部署"
    }
    default: {
      return undefined
    }
  }
}
