<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

<h1>Users</h1>

<ul>
	{#each data.users as user (user.id)}
		<li>
			<a href={resolve(`/users/${user.id}`)}>{user.display_name}</a>
			&middot;
			<span>@{user.username}</span>
		</li>
	{/each}
</ul>
