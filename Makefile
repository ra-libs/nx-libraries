create-react-lib:
	npx nx g @nx/react:library ${NAME} --publishable --importPath @ra-libs/${NAME}

setup-lib:
	npx nx g @theunderscorer/nx-semantic-release:setup-project ${NAME}


lint:
	npx nx format:write
	npx nx affected -t lint --fix

yalc-publish:
	cd dist/packages/react && yalc publish

update:
	nx migrate latest
	nx migrate --run-migrations
	rm migrations.json