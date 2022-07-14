import { Button, Form, Input, Card } from 'antd'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useCallback, useState } from 'react'
function Login() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState(router.query?.error)
  useEffect(() => {
    if (router.query?.error) {
      setError(router.query?.error)
    }
  }, [router.query])

  useEffect(() => {
    if (session) {
      if (status === 'authenticated') {
        router.push('/')
      }
    }
  }, [session])

  const onFinish = (values: any) => {
    // @edu important!!! after login redirect to a specific page
    signIn(
      'credentials',
      {
        callbackUrl: '/',
        redirect: true
      },
      values
    )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const Title = useCallback(() => {
    return (
      <>
        <span>NextJS RBAC Demo</span>
        {error && (
          <>
            <br />
            <span style={{ color: 'tomato' }}>{error}</span>
          </>
        )}
      </>
    )
  }, [error])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#eee',
        position: 'absolute'
      }}
    >
      <Card
        title={<Title />}
        style={{
          width: 300,
          textAlign: 'center',
          position: 'relative',
          left: '50%',
          top: '20%',
          transform: 'translateX(-50%)'
        }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Please input your username!', min: 2 }
            ]}
          >
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!', min: 4 }
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '12px' }}
              >
                Log In
              </Button>
              <Button>Sign Up</Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

Login.displayName = 'LoginPage'
export default Login
