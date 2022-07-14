
# add eslint rules as below (react)

# rules: {
# 'react/react-in-jsx-scope': 'off',
# 'space-before-function-paren': [
# 	'error',
# 	{ anonymous: 'always', named: 'never', asyncArrow: 'always' }
# ],
# 'max-len': ['error', { code: 100, ignoreUrls: true }]
# }
init-eslint:
	npm install --saev-dev eslint
	npm init @eslint/config

init-prisma:
	npx prisma
	npx prisma init
	npm install @prisma/client

migration:
	npx prisma migrate dev --name $(stage)
